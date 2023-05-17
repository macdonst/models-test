// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const address = store.address || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
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
</enhance-page-container>`
}
