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
        Schema::create('travel_allowances', function (Blueprint $table) {
            $table->id();
        $table->string('employee_name');
        $table->decimal('amount', 8, 2); // Adjust the size as needed
        $table->string('destination');
        $table->date('travel_date');
        $table->string('reason'); // Field for the reason
        $table->string('document_path'); // Field for storing document path
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_allowances');
    }
};
