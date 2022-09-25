import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { FC } from "react";
import dayjs from "dayjs";

import type { MovieListItem as MovieListItemType } from "~/features/movieList/types";
import {
  MovieCard,
  MovieCardDate,
  MovieCardDetails,
  MovieCardImage,
  MovieCardTitle,
} from "./styled";

type Props = {
  movie: MovieListItemType;
};

const movieListItemLoader: ImageLoader = ({ src }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_PATH}${src.slice(1)}`;
};

export const MovieListItem: FC<Props> = ({ movie }) => {
  const { title, poster_path, id, release_date } = movie;
  const date = dayjs(release_date).format("YYYY");

  return (
    <li>
      <MovieCard>
        <Link href={`movies/${id}`}>
          <MovieCardImage>
            <Image
              src={poster_path}
              loader={movieListItemLoader}
              alt={`${movie.original_title} - Poster Image`}
              height={600}
              width={400}
              layout="intrinsic"
              style={{ borderRadius: "7px" }}
            />
          </MovieCardImage>
        </Link>
        <MovieCardDetails>
          <MovieCardTitle>
            <Link href={`movies/${id}`}>{title}</Link>
          </MovieCardTitle>
          <MovieCardDate>{date}</MovieCardDate>
        </MovieCardDetails>
      </MovieCard>
    </li>
  );
};
