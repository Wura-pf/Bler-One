-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR');

-- CreateEnum
CREATE TYPE "FileVisibility" AS ENUM ('PRIVATE', 'COMPANY', 'PUBLIC');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'RESTORE', 'LOGIN', 'LOGOUT');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('HOLDING', 'BUSINESS_GROUP', 'FRANCHISOR', 'ASSOCIATION', 'COOPERATIVE', 'PRIVATE_COMPANY', 'PUBLIC_COMPANY', 'NON_PROFIT');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('HEADQUARTERS', 'BRANCH', 'FRANCHISE', 'SUBSIDIARY', 'PARTNER');

-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('STORE', 'CLINIC', 'OFFICE', 'WAREHOUSE', 'FACTORY', 'LABORATORY', 'ONLINE', 'CALL_CENTER');

-- CreateTable
CREATE TABLE "tenants" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "legalName" TEXT,
    "document" TEXT,
    "type" "OrganizationType" NOT NULL DEFAULT 'PRIVATE_COMPANY',
    "country" TEXT NOT NULL DEFAULT 'BR',
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "locale" TEXT NOT NULL DEFAULT 'pt-BR',
    "language" TEXT NOT NULL DEFAULT 'pt-BR',
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "organizationId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "legalName" TEXT,
    "tradeName" TEXT,
    "document" TEXT NOT NULL,
    "type" "CompanyType" NOT NULL DEFAULT 'HEADQUARTERS',
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "country" TEXT NOT NULL DEFAULT 'BR',
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "locale" TEXT NOT NULL DEFAULT 'pt-BR',
    "language" TEXT NOT NULL DEFAULT 'pt-BR',
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "dateFormat" TEXT NOT NULL DEFAULT 'dd/MM/yyyy',
    "numberFormat" TEXT NOT NULL DEFAULT 'pt-BR',
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tradeName" TEXT,
    "type" "UnitType" NOT NULL DEFAULT 'STORE',
    "country" TEXT NOT NULL DEFAULT 'BR',
    "timezone" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "locale" TEXT NOT NULL DEFAULT 'pt-BR',
    "language" TEXT NOT NULL DEFAULT 'pt-BR',
    "currency" TEXT NOT NULL DEFAULT 'BRL',
    "metadata" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "roleId" UUID,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "passwordHash" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdBy" UUID,
    "updatedBy" UUID,
    "deletedBy" UUID,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" UUID NOT NULL,
    "tenantId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "permissionId" UUID NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");

-- CreateIndex
CREATE INDEX "tenants_slug_idx" ON "tenants"("slug");

-- CreateIndex
CREATE INDEX "tenants_active_idx" ON "tenants"("active");

-- CreateIndex
CREATE INDEX "tenants_deletedAt_idx" ON "tenants"("deletedAt");

-- CreateIndex
CREATE INDEX "tenants_active_deletedAt_idx" ON "tenants"("active", "deletedAt");

-- CreateIndex
CREATE INDEX "organizations_tenantId_idx" ON "organizations"("tenantId");

-- CreateIndex
CREATE INDEX "organizations_tenantId_active_idx" ON "organizations"("tenantId", "active");

-- CreateIndex
CREATE INDEX "organizations_tenantId_deletedAt_idx" ON "organizations"("tenantId", "deletedAt");

-- CreateIndex
CREATE INDEX "organizations_type_idx" ON "organizations"("type");

-- CreateIndex
CREATE INDEX "organizations_document_idx" ON "organizations"("document");

-- CreateIndex
CREATE INDEX "organizations_name_idx" ON "organizations"("name");

-- CreateIndex
CREATE INDEX "organizations_active_idx" ON "organizations"("active");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_tenantId_code_key" ON "organizations"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_tenantId_slug_key" ON "organizations"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "companies_tenantId_idx" ON "companies"("tenantId");

-- CreateIndex
CREATE INDEX "companies_organizationId_idx" ON "companies"("organizationId");

-- CreateIndex
CREATE INDEX "companies_tenantId_active_idx" ON "companies"("tenantId", "active");

-- CreateIndex
CREATE INDEX "companies_tenantId_deletedAt_idx" ON "companies"("tenantId", "deletedAt");

-- CreateIndex
CREATE INDEX "companies_organizationId_active_idx" ON "companies"("organizationId", "active");

-- CreateIndex
CREATE INDEX "companies_name_idx" ON "companies"("name");

-- CreateIndex
CREATE INDEX "companies_type_idx" ON "companies"("type");

-- CreateIndex
CREATE INDEX "companies_active_idx" ON "companies"("active");

-- CreateIndex
CREATE UNIQUE INDEX "companies_tenantId_code_key" ON "companies"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "companies_tenantId_slug_key" ON "companies"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "companies_tenantId_document_key" ON "companies"("tenantId", "document");

-- CreateIndex
CREATE INDEX "units_tenantId_idx" ON "units"("tenantId");

-- CreateIndex
CREATE INDEX "units_companyId_idx" ON "units"("companyId");

-- CreateIndex
CREATE INDEX "units_tenantId_active_idx" ON "units"("tenantId", "active");

-- CreateIndex
CREATE INDEX "units_tenantId_deletedAt_idx" ON "units"("tenantId", "deletedAt");

-- CreateIndex
CREATE INDEX "units_companyId_active_idx" ON "units"("companyId", "active");

-- CreateIndex
CREATE INDEX "units_name_idx" ON "units"("name");

-- CreateIndex
CREATE INDEX "units_type_idx" ON "units"("type");

-- CreateIndex
CREATE INDEX "units_active_idx" ON "units"("active");

-- CreateIndex
CREATE UNIQUE INDEX "units_tenantId_code_key" ON "units"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "units_tenantId_slug_key" ON "units"("tenantId", "slug");

-- CreateIndex
CREATE INDEX "users_tenantId_idx" ON "users"("tenantId");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_active_idx" ON "users"("active");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");

-- CreateIndex
CREATE INDEX "users_lastLoginAt_idx" ON "users"("lastLoginAt");

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "users"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_email_key" ON "users"("tenantId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "users_tenantId_username_key" ON "users"("tenantId", "username");

-- CreateIndex
CREATE INDEX "roles_tenantId_idx" ON "roles"("tenantId");

-- CreateIndex
CREATE INDEX "roles_active_idx" ON "roles"("active");

-- CreateIndex
CREATE INDEX "roles_deletedAt_idx" ON "roles"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "roles_tenantId_slug_key" ON "roles"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "permissions_code_idx" ON "permissions"("code");

-- CreateIndex
CREATE INDEX "role_permissions_roleId_idx" ON "role_permissions"("roleId");

-- CreateIndex
CREATE INDEX "role_permissions_permissionId_idx" ON "role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_roleId_permissionId_key" ON "role_permissions"("roleId", "permissionId");

-- CreateIndex
CREATE INDEX "user_permissions_tenantId_idx" ON "user_permissions"("tenantId");

-- CreateIndex
CREATE INDEX "user_permissions_userId_idx" ON "user_permissions"("userId");

-- CreateIndex
CREATE INDEX "user_permissions_permissionId_idx" ON "user_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_userId_permissionId_key" ON "user_permissions"("userId", "permissionId");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
