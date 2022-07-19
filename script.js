const flashcards = [
  {
    top: "OH-",
    bottom: "Hydroxide",
  },
  {
    top: "NO-3",
    bottom: "Nitrate",
  },
  {
    top: "CO2-3",
    bottom: "Carbonate",
  },
  {
    top: "PO3-4",
    bottom: "Phosphate",
  },
  {
    top: "NH+4",
    bottom: "Ammonium",
  },
  {
    top: "SO2-4",
    bottom: "Sulphate",
  },
  {
    top: "HC0-3",
    bottom: "Hydrogen Carbonate",
  },
];

$(() => {
  // Create flashcards
  $(".contain").html("");
  for (var i in flashcards) {
    $(".contain").append(
      getTemplate("flashcard", {
        top: "―",
        bottom: "―",
        desc: "",
        ...flashcards[i],
      }),
    );
  }
  if (flashcards.length < 2) {
    $(".flashcard").addClass("only");
  }

  // Flip / move on click
  $(".flashcard").on("click", function () {
    if ($(this).index() === 1 || $(this).is(".only")) {
      flip();
    } else if ($(this).index() < 1) {
      prev();
    } else if ($(this).index() > 1) {
      next();
    }
  });

  // Move / flip on key down
  $(window).on("keydown", event => {
    switch (event.key) {
      case "ArrowLeft":
        if (!$(".flashcard:first-child").is(".only")) {
          prev();
        }
        break;
      case "ArrowRight":
        if (!$(".flashcard:first-child").is(".only")) {
          next();
        }
        break;
      case " ":
      case "Enter":
        flip();
        break;
    }
  });
});

// Flip focused flashcard
function flip() {
  var el = $(".flashcard:first-child").is(".only")
    ? $(".flashcard:first-child")
    : $(".flashcard:nth-child(2)");
  el.removeClass("flipping");

  el.attr("flip") ? el.removeAttr("flip") : el.attr("flip", true);
  el.addClass("flipping");
}

// Move left to previous flashcard
function prev() {
  $(".flashcard .position").removeClass("left").removeClass("right");

  setTimeout(() => {
    $(".contain").prepend($(".contain .flashcard:last-child"));
    $(".flashcard .position").addClass("left");
  }, 5);
}

// Move right to next flashcard
function next() {
  $(".flashcard .position").removeClass("left").removeClass("right");

  setTimeout(() => {
    $(".contain").append($(".contain .flashcard:first-child"));
    $(".flashcard .position").addClass("right");
  }, 5);
}

// Format template element in html
function getTemplate(name, values) {
  return F.format(
    $(`template[name=${name}]`)
      .html()
      .split("\n")
      .join("")
      .split("  ")
      .join(""),
    values,
  );
}
