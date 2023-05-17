// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const customer = store.customer || {}
  const problems = store.problems || {}

  return html`<enhance-page-container>
  <enhance-form
  action="/customers/${customer.key}"
  method="POST">
  <div class="${problems.form ? 'block' : 'hidden'}">
    <p>Found some problems!</p>
    <ul>${problems.form}</ul>
  </div>
  <enhance-fieldset legend="Customer">
  <enhance-text-input label="First_name" type="text" id="first_name" name="first_name" required value="${customer?.first_name}" errors="${problems?.first_name?.errors}"></enhance-text-input>
  <enhance-text-input label="Last_name" type="text" id="last_name" name="last_name" required value="${customer?.last_name}" errors="${problems?.last_name?.errors}"></enhance-text-input>
  <enhance-fieldset legend="Shipping_address"><enhance-text-input label="Street_address" type="text" id="shipping_address.street_address" name="shipping_address.street_address" required value="${customer?.shipping_address?.street_address}" errors="${problems?.shipping_address?.street_address?.errors}"></enhance-text-input>
<enhance-text-input label="City" type="text" id="shipping_address.city" name="shipping_address.city" required value="${customer?.shipping_address?.city}" errors="${problems?.shipping_address?.city?.errors}"></enhance-text-input>
<enhance-text-input label="State" type="text" id="shipping_address.state" name="shipping_address.state" required value="${customer?.shipping_address?.state}" errors="${problems?.shipping_address?.state?.errors}"></enhance-text-input></enhance-fieldset>
  <enhance-fieldset legend="Billing_address"><enhance-text-input label="Street_address" type="text" id="billing_address.street_address" name="billing_address.street_address" required value="${customer?.billing_address?.street_address}" errors="${problems?.billing_address?.street_address?.errors}"></enhance-text-input>
<enhance-text-input label="City" type="text" id="billing_address.city" name="billing_address.city" required value="${customer?.billing_address?.city}" errors="${problems?.billing_address?.city?.errors}"></enhance-text-input>
<enhance-text-input label="State" type="text" id="billing_address.state" name="billing_address.state" required value="${customer?.billing_address?.state}" errors="${problems?.billing_address?.state?.errors}"></enhance-text-input></enhance-fieldset>
  <input type="hidden" id="key" name="key" value="${customer?.key}" />
  <enhance-submit-button style="float: right"><span slot="label">Save</span></enhance-submit-button>
  </enhance-fieldset>
</enhance-form>
</enhance-page-container>`
}
