import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";
export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);
      });
    });
    this.loading = document.querySelector(".loading");
    this.details = document.querySelector(".details");
    this.games = document.querySelector(".games");
    this.getGames("mmorpg");
    this.ui = new Ui();
  }

  async changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
    const category = link.dataset.category;
    this.getGames(category);
  }

  async getGames(cat) {
    this.loading.classList.remove("d-none");
    const option = {
      method: "Get",
      headers: {
        "X-RapidAPI-Key": "e4dd3006b6msh0f1beb32018a3bcp1e750ajsnf9d56421b48a",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
            }
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
      option
    );

    const response = await api.json();
    this.loading.classList.add("d-none");

    console.log(response);
    this.ui.displayDataGame(response);

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");
           new Details(card.dataset.id);
          
      });
    });
  }
}
