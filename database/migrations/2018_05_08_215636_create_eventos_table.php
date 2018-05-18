<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eventos', function (Blueprint $table) {
            $table->increments('id');
            //$table->dateTime('fechaEvento');
            $table->string('tipoEvento');
            $table->string('descripcion')->nullable();
            $table->float('latitud', 40, 20);
            $table->float('longitud', 40, 20);
            $table->string('nombreUsuaro');
            $table->string('apellidoUsuario');
            $table->string('dniUsuario');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventos');
    }
}
