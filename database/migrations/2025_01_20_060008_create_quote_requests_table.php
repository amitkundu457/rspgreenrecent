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
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->id(); // Auto-increment primary key
            $table->string('name'); // Name of the requester
            $table->string('email'); // Email address
            $table->string('contact'); // Contact number
            $table->string('subject')->nullable(); // Optional subject
            $table->text('message')->nullable(); // Optional message
            $table->timestamps(); // Created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
    }
};
