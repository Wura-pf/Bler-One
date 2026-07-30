import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seed() {
  console.log("🌱 Iniciando seed...");

  const tenant = await prisma.tenant.upsert({
    where: {
      slug: "bler-one",
    },
    update: {},
    create: {
      name: "Blér One",
      slug: "bler-one",
      code: "BLER",
      active: true,
    },
  });

  console.log("✅ Tenant criado:");
  console.log(tenant);

  const legacyPermissionCodes = [
    "iam.users.create",
    "iam.users.read",
    "iam.users.update",
    "iam.users.delete",
    "iam.roles.create",
    "iam.roles.read",
    "iam.roles.update",
    "iam.roles.delete",
  ];

  const legacyPermissions = await prisma.permission.findMany({
    where: {
      code: {
        in: legacyPermissionCodes,
      },
    },
  });

  if (legacyPermissions.length > 0) {
    await prisma.rolePermission.deleteMany({
      where: {
        permissionId: {
          in: legacyPermissions.map((permission) => permission.id),
        },
      },
    });

    await prisma.permission.deleteMany({
      where: {
        id: {
          in: legacyPermissions.map((permission) => permission.id),
        },
      },
    });

    console.log(
      `🧹 ${legacyPermissions.length} permissões legadas removidas.`
    );
  }

  const permissions = [
    {
      code: "iam.user.create",
      name: "Criar usuários",
      description: "Permite criar usuários.",
    },
    {
      code: "iam.user.read",
      name: "Visualizar usuários",
      description: "Permite visualizar usuários.",
    },
    {
      code: "iam.user.update",
      name: "Alterar usuários",
      description: "Permite alterar usuários.",
    },
    {
      code: "iam.user.delete",
      name: "Permite excluir usuários.",
      description: "Permite excluir usuários.",
    },
    {
      code: "iam.role.create",
      name: "Criar papéis",
      description: "Permite criar papéis.",
    },
    {
      code: "iam.role.read",
      name: "Visualizar papéis",
      description: "Permite visualizar papéis.",
    },
    {
      code: "iam.role.update",
      name: "Alterar papéis",
      description: "Permite alterar papéis.",
    },
    {
      code: "iam.role.delete",
      name: "Excluir papéis",
      description: "Permite excluir papéis.",
    },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: {
        code: permission.code,
      },
      update: {
        name: permission.name,
        description: permission.description,
      },
      create: permission,
    });
  }

  console.log(`✅ ${permissions.length} permissões cadastradas.`);

  let administratorRole = await prisma.role.findFirst({
    where: {
      tenantId: tenant.id,
      slug: "administrator",
    },
  });

  if (!administratorRole) {
    administratorRole = await prisma.role.create({
      data: {
        tenantId: tenant.id,
        name: "Administrador",
        slug: "administrator",
        active: true,
      },
    });
  }

  console.log("✅ Role Administrador criada.");

  const allPermissions = await prisma.permission.findMany();

  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: administratorRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: administratorRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log(
    `✅ ${allPermissions.length} permissões vinculadas à Role Administrador.`
  );

  const passwordHash = await bcrypt.hash("Admin@123", 12);

  let administratorUser = await prisma.user.findUnique({
    where: {
      tenantId_email: {
        tenantId: tenant.id,
        email: "admin@blerone.local",
      },
    },
  });

  if (!administratorUser) {
    administratorUser = await prisma.user.create({
      data: {
        tenantId: tenant.id,
        roleId: administratorRole.id,
        firstName: "Administrador",
        lastName: "Sistema",
        email: "admin@blerone.local",
        username: "admin",
        passwordHash,
        active: true,
        emailVerified: true,
      },
    });

    console.log("✅ Usuário administrador criado.");
  } else {
    administratorUser = await prisma.user.update({
      where: {
        id: administratorUser.id,
      },
      data: {
        roleId: administratorRole.id,
        passwordHash,
        active: true,
        emailVerified: true,
      },
    });

    console.log("ℹ️ Usuário administrador atualizado.");
  }

  console.log("✅ Perfil Administrador atribuído ao usuário.");
}

seed()
  .then(async () => {
    console.log("✅ Seed finalizado.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });