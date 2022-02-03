import { Controller, Request,Get, UseGuards, Param, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GenreService } from './genre.service';
import { request } from 'express';
import { identity } from 'rxjs';

@Controller('genres')
export class GenreController {

    constructor( private readonly genreService: GenreService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getList(@Request() request) {
        // request user
        return this.genreService.getGenresForUser(request.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getGenre(
        @Request() request,
        @Param('id', new ParseIntPipe()) id: number
    ) {
        return this.genreService.getGenreDetails(request.user, id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id/movies')
    async getMovies(
        @Request() request,
        @Param('id', new ParseIntPipe()) id: number,
        @Query('orderBy', new DefaultValuePipe('title')) orderBy: string,
        @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number,
        @Query('limit', new DefaultValuePipe(10), new ParseIntPipe()) limit: number
    ) {
        return this.genreService.getMoviesForGenre(request.user, id, orderBy, limit, page)
    }
}
