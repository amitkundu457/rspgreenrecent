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
        Schema::create('client_w_o_s', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->text('client_address');
            $table->string('client_phone_no');
            $table->string('client_work_order');
            $table->date('work_order_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_w_o_s');
    }
};
