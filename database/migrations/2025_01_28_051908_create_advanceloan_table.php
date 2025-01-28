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
        Schema::create('advanceloan', function (Blueprint $table) {
            $table->id();
            $table->string('borrower_name');
            $table->decimal('loan_amount', 10, 2);
            $table->date('loan_date');
            $table->date('due_date');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('advanceloan');
    }
};
