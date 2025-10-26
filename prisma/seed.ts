// prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // --- Criando tenant ---
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Beleza Spa',
      domain: 'beleza.local',
    },
  })

  // --- Criando usuários ---
  const admin = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: 'Administrador',
      email: 'admin@exemplo.com',
      role: UserRole.ADMIN,
      password: 'senha123',
    },
  })

  const reception = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: 'Recepcionista',
      email: 'recepcao@exemplo.com',
      role: UserRole.RECEPTION,
      password: 'senha123',
    },
  })

  const professional = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: 'Carlos Silva',
      email: 'carlos@exemplo.com',
      role: UserRole.PROFESSIONAL,
      password: 'senha123',
      phone: '11988887777',
    },
  })

  const client = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: 'Maria Souza',
      email: 'maria@exemplo.com',
      role: UserRole.CLIENT,
      password: 'senha123',
      phone: '11999996666',
    },
  })

  // --- Criando serviços ---
  const haircut = await prisma.service.create({
    data: {
      tenantId: tenant.id,
      professionalId: professional.id,
      name: 'Corte de Cabelo',
      description: 'Corte simples masculino ou feminino',
      price: 80,
      durationMin: 45,
    },
  })

  const massage = await prisma.service.create({
    data: {
      tenantId: tenant.id,
      professionalId: professional.id,
      name: 'Massagem Relaxante',
      description: 'Sessão de massagem corporal completa',
      price: 200,
      durationMin: 60,
    },
  })

  // --- Criando produtos ---
  const shampoo = await prisma.product.create({
    data: {
      tenantId: tenant.id,
      name: 'Shampoo Hidratante',
      sku: 'SHAMP-001',
      price: 40,
      stock: 50,
    },
  })

  // --- Criando pacotes ---
  const massagePackage = await prisma.package.create({
    data: {
      tenantId: tenant.id,
      name: 'Pacote 5 Massagens',
      sessions: 5,
      price: 900,
    },
  })

  // --- Agendamento com pagamento único ---
  const appointmentOne = await prisma.appointment.create({
    data: {
      tenantId: tenant.id,
      scheduledAt: new Date('2025-09-20T10:00:00Z'),
      clientId: client.id,
      professionalId: professional.id,
      serviceId: haircut.id,
      payments: {
        create: {
          amount: 80,
          method: 'PIX',
          status: 'PAID',
        },
      },
    },
    include: { payments: true },
  })

  // --- Agendamento com pagamento parcelado ---
  const appointmentParcelado = await prisma.appointment.create({
    data: {
      tenantId: tenant.id,
      scheduledAt: new Date('2025-09-22T15:00:00Z'),
      clientId: client.id,
      professionalId: professional.id,
      serviceId: massage.id,
      payments: {
        create: [
          { amount: 100, method: 'CREDIT_CARD', status: 'PAID', installments: 2 },
          { amount: 100, method: 'CREDIT_CARD', status: 'PENDING', installments: 2 },
        ],
      },
    },
    include: { payments: true },
  })

  // --- Criando logs de auditoria ---
  await prisma.auditLog.createMany({
    data: [
      {
        tenantId: tenant.id,
        userId: admin.id,
        action: 'USER_CREATED',
        meta: { createdUser: professional.email },
      },
      {
        tenantId: tenant.id,
        userId: reception.id,
        action: 'USER_LOGIN',
        meta: { ip: '127.0.0.1' },
      },
      {
        tenantId: tenant.id,
        userId: client.id,
        action: 'APPOINTMENT_CREATED',
        meta: { appointmentId: appointmentOne.id },
      },
    ],
  })

  console.log('✅ Seed finalizado com sucesso!')
  console.log({
    admin,
    reception,
    professional,
    client,
    appointmentOne,
    appointmentParcelado,
    shampoo,
    massagePackage,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
