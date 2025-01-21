<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_work_orders', function (Blueprint $table) {
            $table->id();
            $table->string('seller_name');
            $table->text('seller_address');
            $table->date('date_of_wo');
            $table->string('subject');
            $table->string('contact_person_name');
            $table->text('job_details');
            $table->string('task');
            $table->integer('quantity');
            $table->string('uom'); 
            $table->decimal('rate', 10, 2);
            $table->decimal('amount', 10, 2); 
            $table->string('hsn_code'); // HSN Code
            $table->decimal('gst_rate', 5, 2); // GST rate, like 18, 5 etc.
            $table->decimal('total_with_gst', 10, 2); // Total amount including GST
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_work_orders');
    }
};
