#' Generic rdeck control widget 
#'
#' A generic control widget constructor.
#'
#' @import htmlwidgets
rdeckControls <- function(
  targetRDeckId,
  controlType = "dropdown",
  controlData = NULL,
  width = NULL,
  height = NULL,
  elementId = NULL
) {

  # forward options using x
  x <- list(
    targetRDeckId = targetRDeckId,
    controlType = controlType,
    controlData = controlData
  )

  # create widget
  htmlwidgets::createWidget(
    name = "rdeckControls",
    x,
    width = width,
    height = height,
    package = "rdeck.controls",
    elementId = elementId
  )
}

#' Shiny bindings for rdeckControls
#'
#' Output and render functions for using rdeckControls within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a rdeckControls
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name rdeckControls-shiny
#'
#' @export
rdeckControlsOutput <- function(outputId, width = "100%", height = "400px") {
  htmlwidgets::shinyWidgetOutput(outputId, "rdeckControls", width, height, package = "rdeck.controls")
}

#' @rdname rdeckControls-shiny
#' @export
renderRdeckControls <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) {
    expr <- substitute(expr)
  } # force quoted
  htmlwidgets::shinyRenderWidget(expr, rdeckControlsOutput, env, quoted = TRUE)
}


#' Dropdown layer selector for rdeck maps
#'
#' Create an external layer control for an rdeck map in rmarkdown or shiny.
#'
#' @param rdeck DESCRIPTION.
#' @param layer_names DESCRIPTION.
#' @param layer_group_names DESCRIPTION.
#' @param initial_selection DESCRIPTION.
#'
#' @return a htmlwidget
#' @export
rdeck_layer_dropdown <- function(
  rdeck,
  layer_names,
  layer_group_names,
  initial_selection = NULL 
) {

  rdeck_id <-
    rdeck$elementId

  rdeck_layer_names <-
    rdeck$x$layers %>%
    purrr::map(pluck, "name") %>%
    purrr::keep(~ !is.null(.)) %>%
    setNames(., .)

  rdeck_layer_group_names <-
    rdeck$x$layers %>%
    purrr::map(pluck, "group_name") %>%
    purrr::keep(~ !is.null(.)) %>%
    setNames(., .)

  selected_layers <-
    if (!is.null(rdeck_layer_names)) {
      tidyselect::eval_select(
        rlang::enquo(layer_names),
        data = rdeck_layer_names,
        allow_rename = FALSE
      )
    } else {
      integer(0)
    }

  selected_groups <-
    if (!is.null(rdeck_layer_group_names)) {
      tidyselect::eval_select(
        rlang::enquo(layer_group_names),
        data = rdeck_layer_group_names,
        allow_rename = FALSE
      )
    } else {
      integer(0)
    }

  all_names <- c(rdeck_layer_names[selected_layers], 
                 rdeck_layer_group_names[selected_groups]) %>%
                 unlist() %>%
                 unname()

  if (length(all_names) == 0) {
    stop("Couldn't match any layer names or group names")
  }

  if (!is.null(initial_selection)) {
  stopifnot(initial_selection %in% all_names)
  } else {
    initial_selection <- all_names[1]
  }

  control_data <-
    list(
      layerNames = as.character(unname(rdeck_layer_names[selected_layers])),
      layerGroupNames = as.character(unname(rdeck_layer_group_names[selected_groups])),
      initialSelection = initial_selection
    )

  rdeckControls(
    targetRDeckId = rdeck_id,
    controlType = "dropdown",
    controlData = control_data
  )
}
