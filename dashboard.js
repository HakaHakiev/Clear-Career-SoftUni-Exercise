import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllOffers } from "../api/data.js";

const dashboardTemplate = (offers) => html`
  <section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${offers.length == 0
      ? html`<h2>No offers yet.</h2>`
      : offers.map(
          (o) => html` <div class="offer">
            <img src="${o.imageUrl}" alt="example1" />
            <p><strong>Title: </strong><span class="title">${o.title}</span></p>
            <p>
              <strong>Salary:</strong><span class="salary">${o.salary}</span>
            </p>
            <a class="details-btn" href="/details/${o._id}">Details</a>
          </div>`
        )}
  </section>
`;

export async function dashboardPage(ctx) {
  const offers = await getAllOffers();
  console.log(offers);
  ctx.render(dashboardTemplate(offers));
}
