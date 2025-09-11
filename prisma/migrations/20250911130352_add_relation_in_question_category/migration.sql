-- AddForeignKey
ALTER TABLE "public"."Question_Category" ADD CONSTRAINT "Question_Category_kerajaanId_fkey" FOREIGN KEY ("kerajaanId") REFERENCES "public"."Kerajaan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Question_Category" ADD CONSTRAINT "Question_Category_tokohId_fkey" FOREIGN KEY ("tokohId") REFERENCES "public"."Tokoh"("id") ON DELETE SET NULL ON UPDATE CASCADE;
