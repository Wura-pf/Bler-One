import { Button, Card, Header, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
    console.log(data);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F2EE]">
      <Card>
        <form
          className="w-[420px] space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Header
            title="Blér One"
            subtitle="Sistema Inteligente para Salões"
          />

          <Input
            type="email"
            placeholder="E-mail"
            {...register("email", {
              required: "O e-mail é obrigatório",
            })}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          <Input
            type="password"
            placeholder="Senha"
            {...register("password", {
              required: "A senha é obrigatória",
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <Button type="submit">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}