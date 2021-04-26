-- CreateTable
CREATE TABLE "codif_extension" (
"id" SERIAL,
    "name" TEXT,
    "description" TEXT,
    "group_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "codif_group" (
"id" SERIAL,
    "name" TEXT,
    "display" BOOLEAN NOT NULL DEFAULT false,
    "upload" BOOLEAN NOT NULL DEFAULT false,
    "size" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "codif_extension" ADD FOREIGN KEY("group_id")REFERENCES "codif_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
