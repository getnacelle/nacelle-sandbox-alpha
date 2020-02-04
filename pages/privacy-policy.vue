<template>
  <div class="article-page">
    <article class="article">
      <div class="container">
        <div class="policy columns is-centered is-multiline">
          <div class="column is-9 content">
            <div class="article-header column has-text-centered">
              <header>
                <h1 class="article-title title">Your Privacy Policy Goes Here</h1>
              </header>
            </div>
            <p>
              It's important to provide your users with an explanation of your privacy
              policy in order to comply with data privacy laws such as
              <a
                href="https://gdpr.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >GDPR</a>
              and
              <a
                href="https://oag.ca.gov/privacy/ccpa"
                target="_blank"
                rel="noopener noreferrer"
              >CCPA</a>. As a merchant, it's your responsibility to have an active command of
              the cookies delivered by your site, and to communicate to your users:
            </p>
            <ul>
              <li>the purpose and scope of cookies on your site</li>
              <li>how and why information about your users is collected</li>
              <li>what kind of information about your users is collected</li>
              <li>when information about your users is collected</li>
              <li>how information about your users is used</li>
              <li>for how long information about your users is stored</li>
              <li>how to opt out of personal data collection, in part or in full</li>
            </ul>

            <p>
              Your obligations to disclose information about personal data collection
              will vary depending on where you do business. Please note that the data
              privacy communication obligations listed above are only provided as
              suggestions of industry best practices. While these reccomendations are
              a good starting point, it is the merchant's responsibility to seek out
              and act on the legal advice of an attorney before collecting or
              processing users' personal information.
            </p>
            <p>
              Enabling users to select their cookie preferences is an important
              component of GDPR compliance. You can use Nacelle's built-in
              <code>{{'opt-in-opt-out-form'}}</code> and
              <code>{{'form-consent-field'}}</code> components to quickly create
              forms for setting cookie preferences, such as the one below:
            </p>
          </div>
          <opt-in-opt-out-form class="column is-9">
            <form-consent-field name="Marketing">
              <template v-slot:title>Marketing</template>
              <template v-slot:description>
                Send you relevant marketing information and carry out market research
                about our products and services so that you don't miss out on current
                offers. We normally contact our customers by automated or electronic
                means including email and phone (e.g. SMS, MMS). We sometimes use
                other means such as web sites.
              </template>
            </form-consent-field>
            <form-consent-field name="Profiling">
              <template v-slot:title>Profiling</template>
              <template v-slot:description>
                Analyze your personal preferences, interests, or behaviors
                so we can deliver you with personalized shopping experiences.
              </template>
            </form-consent-field>
            <form-consent-field name="thirdParties">
              <template v-slot:title>Communication of Data to Third Parties</template>
              <template v-slot:description>
                Share your data with companies in our group and selected partners
                with whom we work closely so that they can send you relevant offers
                which might interest you.
              </template>
            </form-consent-field>
            <p class="tip">
              Adding a new
              <code>form-consent-field</code>
              will provide the required template code which can be copied and pasted
              to set the new section's title and description. For example:
            </p>
            <form-consent-field></form-consent-field>
          </opt-in-opt-out-form>
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.policy {
  margin-top: 2em;
}
.article .container {
  position: relative;
  margin-top: -3rem;
  padding: 2rem;
  padding-bottom: 5rem;
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  max-width: 1024px;
}
.tip {
  margin-bottom: 2em;
}
</style>