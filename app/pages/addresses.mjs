// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  let addresses = store.addresses || []
  const address = store.address || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <main>
    <h1 class="mb1 font-semibold text3">Addresses page</h1>
    ${addresses.map(item => `<article class="mb2">
<div class="mb0">
  <p class="pb-2"><strong class="capitalize">street_address: </strong>${item?.street_address || ''}</p>
  <p class="pb-2"><strong class="capitalize">city: </strong>${item?.city || ''}</p>
  <p class="pb-2"><strong class="capitalize">state: </strong>${item?.state || ''}</p>
  <p class="pb-2"><strong class="capitalize">key: </strong>${item?.key || ''}</p>
</div>
<p class="mb-1">
  <enhance-link href="/addresses/${item.key}">Edit this address</enhance-link>
</p>
<form action="/addresses/${item.key}/delete" method="POST" class="mb-1">
  <enhance-submit-button><span slot="label">Delete this address</span></enhance-submit-button>
</form>
</article>`).join('\n')}
<details class="mb0" ${Object.keys(problems).length ? 'open' : ''}>
    <summary>New address</summary>
    <enhance-form
  action="/addresses/${address.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Address">
  <enhance-text-input label="Street_address" type="text" id="street_address" name="street_address" required value="${address?.street_address}" errors="${problems?.street_address?.errors}"></enhance-text-input>
  <enhance-text-input label="City" type="text" id="city" name="city" required value="${address?.city}" errors="${problems?.city?.errors}"></enhance-text-input>
  <enhance-text-input label="State" type="text" id="state" name="state" required value="${address?.state}" errors="${problems?.state?.errors}"></enhance-text-input>
  <input type="hidden" id="key" name="key" value="${address?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</details>
</main>
</enhance-page-container>
  `
}
