import { html } from "../../node_modules/lit-html/lit-html.js";
import { editOfferById, getOfferById } from "../api/data.js";

const editTemplate = (offer, onSubmit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Offer</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input
          type="text"
          name="title"
          id="job-title"
          placeholder="Title"
          value=${offer.title}
        />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
          value=${offer.imageUrl}
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
          value=${offer.category}
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        >
${offer.description}</textarea
        >
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        >
${offer.requirements}</textarea
        >
        <input
          type="text"
          name="salary"
          id="job-salary"
          placeholder="Salary"
          value=${offer.salary}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const offerId = ctx.params.id;

  const offer = await getOfferById(offerId);
  ctx.render(editTemplate(offer, onSubmit));

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

    await editOfferById(offerId, newOffer);
    offer.target.reset();
    ctx.page.redirect(`/details/${offerId}`);
  }
}
