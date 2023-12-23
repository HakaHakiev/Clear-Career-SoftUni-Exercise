import { html } from "../../node_modules/lit-html/lit-html.js";
import { addOffer } from "../api/data.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(offer) {
    offer.preventDefault();
    const formData = new FormData(offer.target);

    const newOffer = {
      title: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      category: formData.get("category"),
      description: formData.get("description"),
      requirements: formData.get("requirements"),
      salary: formData.get("salary"),
    };

    if (Object.values(newOffer).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addOffer(newOffer);
    offer.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
