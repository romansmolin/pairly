-- CreateTable
CREATE TABLE "gift_inventory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "giftId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gift_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gift_inventory_userId_giftId_key" ON "gift_inventory"("userId", "giftId");

-- CreateIndex
CREATE INDEX "gift_inventory_userId_updatedAt_idx" ON "gift_inventory"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "gift_inventory_giftId_idx" ON "gift_inventory"("giftId");

-- AddForeignKey
ALTER TABLE "gift_inventory" ADD CONSTRAINT "gift_inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_inventory" ADD CONSTRAINT "gift_inventory_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "gift_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
