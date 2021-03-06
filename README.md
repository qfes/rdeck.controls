
<!-- README.md is generated from README.Rmd. Please edit that file -->

# rdeck.controls

<!-- badges: start -->

<!-- badges: end -->

## Concept

``` r
library(tidyverse)
library(rdeck)
library(sf)
library(RcppSimdJson)
library(viridis)
library(rdeck.controls)

url <- file.path(
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master",
  "examples/scatterplot/manhattan.json",
  fsep = "/"
)
manhattan_data <- fload(url) %>%
  as_tibble(.name_repair = ~ c("lon", "lat", "species")) %>%
  mutate(
    position = sfc_point(lon, lat),
    species_name = if_else(species == 1, "dog", "cat")
  )

manhattan_map <-
  rdeck(
    map_style = mapbox_dark(),
    # set the bounds of the map to include all of the manhattan data
    initial_bounds = st_bbox(manhattan_data$position),
    # add a 2 pixel buffer to each point, making it easier to hover
    picking_radius = 2,
    id = "my_rdeck"
  ) %>%
  add_scatterplot_layer(
    name = "manhattan_dogs",
    data = filter(manhattan_data, species_name == "dog"),
    # the coloumn in manhattan_data which contains the location of each point
    get_position = position,
    # a categorical colour scale, using the species column and a cividis colour palette
    get_fill_color = scale_color_category(
      col = species,
      palette = cividis(2)[[1]]
    ),
    # the radius of each point (default 1 metre) is scaled by 30
    radius_scale = 30,
    radius_min_pixels = 0.5,
    # highlight dot density
    blending_mode = "additive",
    # interactivity
    pickable = TRUE,
    auto_highlight = TRUE,
    # per-species highlight colour
    highlight_color = scale_color_category(
      col = species,
      palette = c("#0060e6"),
      legend = FALSE
    ),
    tooltip = c(species, species_name)
  ) %>%
  add_scatterplot_layer(
    name = "manhattan_cats",
    data = filter(manhattan_data, species_name == "cat"),
    # the coloumn in manhattan_data which contains the location of each point
    get_position = position,
    # a categorical colour scale, using the species column and a cividis colour palette
    get_fill_color = scale_color_category(
      col = species,
      palette = cividis(2)[[2]]
    ),
    # the radius of each point (default 1 metre) is scaled by 30
    radius_scale = 30,
    radius_min_pixels = 0.5,
    # highlight dot density
    blending_mode = "additive",
    # interactivity
    pickable = TRUE,
    auto_highlight = TRUE,
    # per-species highlight colour
    highlight_color = scale_color_category(
      col = species,
      palette = c("#fff399"),
      legend = FALSE
    ),
    tooltip = c(species, species_name)
  )
```

``` r
rdeck_layer_dropdown(
  manhattan_map,
  starts_with("manhattan"),
  height = "1em !important",
  label = "Select the pet type: "
)
```

``` r
manhattan_map
```
