import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  getOfferById,
  deleteOfferById,
  apply,
  getTotalApplies,
  didUserApply,
} from "../api/data.js";

const detailsTemplate = (
  offer,
  isOwner,
  onDelete,
  isLoggedIn,
  totalAppliesCount,
  onClickApply,
  didUserApplieded
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${offer.imageUrl}" alt="example1" />
      <p id="details-title">${offer.title}</p>
      <p id="details-category">
        Category: <span id="categories">${offer.category}</span>
      </p>
      <p id="details-salary">
        Salary: <span id="salary-number">${offer.salary}</span>
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Description</h4>
          <span>${offer.description}</span>
        </div>
        <div id="details-requirements">
          <h4>Requirements</h4>
          <span>${offer.requirements}</span>
        </div>
      </div>
      <p>
        Applications: <strong id="applications">${totalAppliesCount}</strong>
      </p>

      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
        ${isOwner
          ? html` <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
                >Delete</a
              >`
          : ""}
        ${(() => {
          if (didUserApplieded == 0) {
            if (isLoggedIn && !isOwner) {
              return html` <a
                href="javascript:void(0)"
                @click=${onClickApply}
                id="apply-btn"
                >Apply</a
              >`;
            }
          }
        })()}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const offerId = ctx.params.id;
  const offer = await getOfferById(offerId);
  const user = ctx.user;

  let userId;
  let totalAppliesCount;
  let didUserApplieded;

  if (user != null) {
    userId = user._id;
    didUserApplieded = await didUserApply(offerId, userId);
  }

  const isOwner = user && offer._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalAppliesCount = await getTotalApplies(offerId);
  ctx.render(
    detailsTemplate(
      offer,
      isOwner,
      onDelete,
      isLoggedIn,
      totalAppliesCount,
      onClickApply,
      didUserApplieded
    )
  );

  async function onClickApply() {
    const applies = {
      offerId: offerId,
    };
    await apply(applies);

    totalAppliesCount = await getTotalApplies(offerId);
    didUserApplieded = await didUserApply(offerId, userId);
    ctx.render(
      detailsTemplate(
        offer,
        isOwner,
        onDelete,
        isLoggedIn,
        totalAppliesCount,
        onClickApply,
        didUserApply
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteOfferById(offerId);
      ctx.page.redirect("/dashboard");
    }
  }
}
