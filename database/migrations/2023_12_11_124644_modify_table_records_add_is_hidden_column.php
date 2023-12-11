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
        if (!Schema::hasColumn('records', 'is_hidden')) {
            Schema::table('records', function (Blueprint $table) {
                $table->boolean('is_hidden')->default(false)->after('is_pending');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('records', 'is_hidden')) {
            Schema::table('records', function (Blueprint $table) {
                $table->dropColumn('is_hidden');
            });
        }
    }
};
