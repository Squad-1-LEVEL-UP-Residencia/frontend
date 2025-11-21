"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useState } from "react"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { Label } from "@/components/private/ui/label"
import { SpanError } from "@/components/private/ui/span-error"
import { changePasswordSchema, type ChangePasswordFormData } from "@/types/settings/change-password-schema"

export function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema)
  })

  const newPassword = watch("newPassword") || ""

  const passwordRequirements = [
    {
      label: "Mínimo de 8 caracteres",
      met: newPassword.length >= 8
    },
    {
      label: "Pelo menos uma letra maiúscula",
      met: /[A-Z]/.test(newPassword)
    },
    {
      label: "Pelo menos um número",
      met: /[0-9]/.test(newPassword)
    },
    {
      label: "Pelo menos um caractere especial",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    }
  ]

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      console.log("Mudando senha:", data)

      toast.success("Senha alterada com sucesso!")
      reset()
    } catch (error) {
      toast.error("Erro ao alterar senha")
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <Label htmlFor="currentPassword">Senha Atual</Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Digite sua senha atual"
            variant="placeholder"
            {...register("currentPassword")}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.currentPassword && <SpanError>{errors.currentPassword.message}</SpanError>}
      </div>

      <div>
        <Label htmlFor="newPassword">Nova Senha</Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Digite sua nova senha"
            variant="placeholder"
            {...register("newPassword")}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.newPassword && <SpanError>{errors.newPassword.message}</SpanError>}

        <div className="mt-3 space-y-2">
          <p className="text-sm font-medium text-gray-700">Requisitos da senha:</p>
          {passwordRequirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2">
              {req.met ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <X size={16} className="text-gray-400" />
              )}
              <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                {req.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua nova senha"
            variant="placeholder"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <SpanError>{errors.confirmPassword.message}</SpanError>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          outline
          onClick={() => reset()}
          className="min-w-32"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color="indigo"
          outline={false}
          className="min-w-32"
        >
          Alterar Senha
        </Button>
      </div>
    </form>
  )
}
