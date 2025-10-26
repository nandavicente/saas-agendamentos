/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `datetime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professionalId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Appointment" DROP COLUMN "clientEmail",
DROP COLUMN "clientName",
DROP COLUMN "datetime",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Payment" DROP COLUMN "createdAt",
DROP COLUMN "method";

-- AlterTable
ALTER TABLE "public"."Service" DROP COLUMN "createdAt",
DROP COLUMN "duration",
DROP COLUMN "userId",
ADD COLUMN     "professionalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
ALTER COLUMN "role" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
