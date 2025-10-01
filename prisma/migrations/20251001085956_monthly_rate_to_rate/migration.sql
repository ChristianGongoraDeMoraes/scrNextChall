/*
  Warnings:

  - You are about to drop the column `monthly_rate` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `rate` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "monthly_rate",
ADD COLUMN     "rate" DECIMAL(5,2) NOT NULL;
