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
rdeckControlsOutput <- function(outputId, width = "100%", height = "1em") {
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
#' Match `layer_names` and or `layer_group_names` by using 'tidy select' syntax see [tidyselect::eval_select()].
#'
#' The `layer_names` tidyselect can only be used to toggle visibility of ungrouped layers, that is layers with no `group_name` set. This is enforced by `{rdeck}`.
#'
#' @param rdeck the target rdeck instance to create a control for.
#' @param layer_names a tidy select expression matching layer names. e.g. starts_with("demand")
#' @param layer_group_names a tidy select expression matching layer group names. e.g. starts_with("rfs")
#' @param initial_selection The layer or layer group that is to be selected by default before the user has interacted with the control. Defaults to the first matched layer name, then layer group name.
#' @param label Some text that immediately precedes the dropdown control.
#' @param width of the control div as css dimension string.
#' @param height of the control div as css dimenson string.
#' @importFrom magrittr %>%
#' @autoglobal
#' @export
rdeck_layer_dropdown <- function(
  rdeck,
  layer_names,
  layer_group_names,
  initial_selection = NULL,
  label = "",
  width = "100%",
  height = "1em"
) {

  rdeck_id <-
    rdeck$elementId

  if (is.null(rdeck_id)) {
    rdeck_instance <- deparse1(substitute(rdeck))
    stop(paste(
      "The rdeck instance",
      rdeck_instance,
      "has elementId == NULL.",
      "Use the id parameter when creating the map instance to set an id",
      "that can be referred to by rdeck.controls.",
      collapse = " "
    ))
  }

  rdeck_layer_names <-
    rdeck$x$layers %>%
    purrr::map(purrr::pluck, "name") %>%
    purrr::keep(~ !is.null(.)) %>%
    stats::setNames(., .)

  rdeck_layer_group_names <-
    rdeck$x$layers %>%
    purrr::map(purrr::pluck, "group_name") %>%
    purrr::keep(~ !is.null(.)) %>%
    stats::setNames(., .)

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

  all_names <- c(
    rdeck_layer_names[selected_layers],
    rdeck_layer_group_names[selected_groups]
  ) %>%
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
      initialSelection = initial_selection,
      label = label
    )

  rdeckControls(
    targetRDeckId = rdeck_id,
    controlType = "dropdown",
    controlData = control_data,
    width = width,
    height = height
  )
}

#' convert rdeckContols to html allowing !important
#'
#' @param x an rdeckControls widget
#' @param ... other args passed to htmlwidgets:::toHTML
#'
#' @return html for the widget 
#' @importFrom htmltools as.tags 
#' @export
as.tags.rdeckControls <- function(x, ...) {
  to_rdeckControls_HTML(x)
}




# This function is a simple rewrite of htmlwidgets:::toHTML
# to remove validation of the height and width to allow the use of
# !important with CSS units. It is released under MIT license:
#
# Copyright 2016 Ramnath Vaidyanathan, Joe Cheng, JJ Allaire, Yihui Xie, and Kenton Russell
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
# of the Software, and to permit persons to whom the Software is furnished to do
# so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software
to_rdeckControls_HTML <- function(x, standalone = FALSE, knitrOptions = NULL) {

  sizeInfo <- htmlwidgets:::resolveSizing(x, x$sizingPolicy, standalone = standalone, knitrOptions = knitrOptions)

  if (!is.null(x$elementId))
    id <- x$elementId
  else
    id <- paste("htmlwidget", htmlwidgets:::createWidgetId(), sep="-")

  w <- sizeInfo$width
  h <- sizeInfo$height

  # create a style attribute for the width and height
  style <- paste(
    "width:", w, ";",
    "height:", h, ";",
    sep = "")

  x$id <- id

  container <- if (isTRUE(standalone)) {
    function(x) {
      htmltools::div(id="htmlwidget_container", x)
    }
  } else {
    identity
  }

  html <- htmltools::tagList(
    container(
      htmltools::tagList(
        x$prepend,
        htmlwidgets:::widget_html(
          name = class(x)[1],
          package = attr(x, "package"),
          id = id,
          style = style,
          class = paste(class(x)[1], "html-widget"),
          width = sizeInfo$width,
          height = sizeInfo$height
        ),
        x$append
      )
    ),
    htmlwidgets:::widget_data(x, id),
    if (!is.null(sizeInfo$runtime)) {
      htmltools::tags$script(type="application/htmlwidget-sizing", `data-for` = id,
        htmlwidgets:::toJSON(sizeInfo$runtime)
      )
    }
  )
  html <- htmltools::attachDependencies(html,
    c(htmlwidgets:::widget_dependencies(class(x)[1], attr(x, 'package')),
      x$dependencies)
  )

  htmltools::browsable(html)

}