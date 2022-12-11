export const appRoutes = {
  charactersPage: "/characters",
  characterDetailsPage: (id: number) => {
    return `/characters/${id}`;
  },
  episodesPage: "/episodes",
  episodeDetailsPage: (id: number) => {
    return `/episodes/${id}`;
  },
};
