import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "Administrador",
      email: "admin@lunatv.com",
      password: "Dpe6Qx6Hu4Otx5dgAVmR6",
      role: Role.admin,
    },
    {
      name: "LunaTV",
      email: "owner@lunatv.com",
      password: "W33qqUdvucfVgWurzd",
      role: Role.admin,
    },
  ];

  // Crear un usuario por defecto
  users.forEach(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: passwordHash,
        role: user.role!,
        emailVerified: new Date(),
      },
    });
  });

  console.log("Seeder completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
