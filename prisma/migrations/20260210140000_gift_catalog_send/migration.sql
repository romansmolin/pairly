-- CreateTable
CREATE TABLE "gift_catalog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "priceCoins" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gift_catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gift_send" (
    "id" TEXT NOT NULL,
    "senderUserId" TEXT NOT NULL,
    "recipientDatingUserId" INTEGER NOT NULL,
    "giftId" TEXT NOT NULL,
    "priceCoins" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_send_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gift_catalog_slug_key" ON "gift_catalog"("slug");

-- CreateIndex
CREATE INDEX "gift_send_senderUserId_createdAt_idx" ON "gift_send"("senderUserId", "createdAt");

-- CreateIndex
CREATE INDEX "gift_send_recipientDatingUserId_createdAt_idx" ON "gift_send"("recipientDatingUserId", "createdAt");

-- CreateIndex
CREATE INDEX "gift_send_giftId_idx" ON "gift_send"("giftId");

-- AddForeignKey
ALTER TABLE "gift_send" ADD CONSTRAINT "gift_send_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gift_send" ADD CONSTRAINT "gift_send_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "gift_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Seed gift catalog
INSERT INTO "gift_catalog" ("id", "slug", "name", "imagePath", "priceCoins", "isActive", "sortOrder", "createdAt", "updatedAt") VALUES
('gift_roses', 'roses', 'Roses', '/gifts/Roses.png', 60, true, 10, NOW(), NOW()),
('gift_tulips', 'tulips', 'Tulips', '/gifts/Tulips.png', 40, true, 20, NOW(), NOW()),
('gift_gerbera', 'gerbera', 'Gerbera', '/gifts/Gerbera.png', 45, true, 30, NOW(), NOW()),
('gift_lilacs', 'lilacs', 'Lilacs', '/gifts/Lilacs.png', 50, true, 40, NOW(), NOW()),
('gift_freesia', 'freesia', 'Freesia', '/gifts/Freesia.png', 35, true, 50, NOW(), NOW()),
('gift_dahlias', 'dahlias', 'Dahlias', '/gifts/Dahlias.png', 55, true, 60, NOW(), NOW()),
('gift_hydrangea', 'hydrangea', 'Hydrangea', '/gifts/Hydrangea.png', 65, true, 70, NOW(), NOW()),
('gift_orhid', 'orhid', 'Orhid', '/gifts/Orhid.png', 75, true, 80, NOW(), NOW()),
('gift_pions', 'pions', 'Pions', '/gifts/Pions.png', 70, true, 90, NOW(), NOW()),
('gift_ranunculus', 'ranunculus', 'Ranunculus', '/gifts/Ranunculus.png', 52, true, 100, NOW(), NOW());
