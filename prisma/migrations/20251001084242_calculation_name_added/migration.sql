/*
  Warnings:

  - Added the required column `calculation_name` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calculation" ADD COLUMN     "calculation_name" TEXT NOT NULL;
