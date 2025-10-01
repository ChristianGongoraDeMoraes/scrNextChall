/*
  Warnings:

  - Added the required column `rate_type` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculation" ADD COLUMN     "rate_type" TEXT NOT NULL;
