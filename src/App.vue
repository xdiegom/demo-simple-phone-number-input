<template>
  <div id="app" class="p-2 bg-gray-200 min-h-screen px-8">
    <div class="flex justify-between w-full items-baseline">
      <h1 class="font-bold text-3xl mt-2">Simple Phone Number Input</h1>
      <div class="flex mr-4 space-x-2">
        <a
          href="https://github.com/xdiegom/simple-phone-number-input"
          target="_blank"
        >
          <img class="w-4" src="./assets/github.svg" alt="github" />
        </a>
        <a
          href="https://www.npmjs.com/package/simple-phone-number-input"
          target="_blank"
        >
          <img class="w-8" src="./assets/npm.svg" alt="npm" />
        </a>
      </div>
    </div>
    <div class="text-right my-2 mr-4">
      <a
        class="font-medium underline hover:text-blue-500"
        href="https://codesandbox.io/s/101-simple-phone-number-input-uwlwd?file=/src/App.vue"
        target="_blank"
      >
        Demo Code
      </a>
    </div>
    <div class="flex flex-col-reverse lg:flex-row mt-2">
      <!-- controls -->
      <div
        class="bg-white rounded-lg shadow-lg w-full space-y-2 my-4 p-3 lg:w-1/3 lg:my-0 lg:mr-3"
      >
        <div
          class="w-full font-bold text-2xl border-b-2 border-blue-300 mb-3 uppercase"
        >
          Props
        </div>

        <!-- Default country -->
        <div class="space-y-1">
          <div class="font-medium">Default country</div>
          <select
            name="default-country"
            id="default-country"
            class="py-2 px-2 border rounded w-full"
            v-model="defaultCountryCode"
          >
            <option
              v-for="country in countries"
              :key="country.code"
              :value="country.code"
              >{{ country.name }}</option
            >
          </select>
        </div>

        <!-- Locale -->
        <div class="space-y-1">
          <div class="font-medium">Locale</div>
          <select
            name="locale"
            id="locale"
            class="py-2 px-2 border rounded w-full"
            v-model="locale"
          >
            <option
              v-for="locale in locales"
              :key="locale.code"
              :value="locale.code"
              >{{ locale.name }}</option
            >
          </select>
        </div>

        <div class="border border-blue-300 p-3 rounded-lg">
          <span class="text-sm font-medium mb-2">
            Use
            <a
              href="https://tailwindcss.com/"
              class="text-blue-400 hover:text-blue-300"
              target="_blank"
              >tailwindcss</a
            >
            classes to modify input and selector
          </span>
          <!-- Input class -->
          <div>
            <div class="font-medium">Input class</div>
            <input
              v-model="inputClass"
              name="input-class"
              type="text"
              class="w-full border rounded py-2 px-2"
            />
          </div>

          <!-- Selector class -->
          <div>
            <div class="font-medium">Selector class</div>
            <input
              v-model="selectorClass"
              name="selector-class"
              type="text"
              class="w-full border rounded py-2 px-2"
            />
          </div>
        </div>

        <!-- No dial Code -->
        <div class="space-x-1 items-baseline">
          <input
            type="checkbox"
            name="no-dial-code"
            id="no-dial-code"
            v-model="noDialCode"
          />
          <span class="font-medium">No dial code</span>
        </div>
        <!-- No Country selector -->
        <div class="space-x-1 items-baseline">
          <input
            type="checkbox"
            name="no-country-selector"
            id="no-country-selector"
            v-model="noCountrySelector"
          />
          <span class="font-medium">No country selector</span>
        </div>
      </div>

      <!-- demo -->
      <div
        class="bg-white rounded-lg shadow-lg w-full space-y-2 my-4 p-3 flex-1 lg:my-0 lg:mr-3 space-y-2"
      >
        <div
          class="w-full font-bold text-2xl border-b-2 border-blue-300 mb-3 uppercase"
        >
          Example
        </div>

        <div :key="defaultCountryCode">
          <simple-phone-number-input
            class="font-medium"
            :input-class="inputClass"
            :selector-class="selectorClass"
            :locale="locale"
            :default-country-code="defaultCountryCode"
            :no-dial-code="noDialCode"
            :no-country-selector="noCountrySelector"
            @onFormatted="setPhoneNumber"
          ></simple-phone-number-input>
        </div>

        <div class="w-full font-bold text-2xl border-b-2 border-blue-300 mb-3">
          Results when <b>onFormatted</b> event is triggered and returns an
          object
        </div>
        <table class="w-full">
          <thead class="bg-blue-100 uppercase font-medium">
            <tr>
              <td>property</td>
              <td>value</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-medium">phoneNumberExample</td>
              <td>{{ phoneNumberExample }}</td>
            </tr>
            <tr>
              <td class="font-medium">countryCode</td>
              <td>{{ countryCode }}</td>
            </tr>
            <tr>
              <td class="font-medium">countryCallingCode</td>
              <td>{{ countryCallingCode }}</td>
            </tr>
            <tr>
              <td class="font-medium">nationalNumber</td>
              <td>{{ nationalNumber }}</td>
            </tr>
            <tr>
              <td class="font-medium">internationalNumber</td>
              <td>{{ internationalNumber }}</td>
            </tr>
            <tr>
              <td class="font-medium">isValid</td>
              <td>{{ isValid }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import countries from "./countries";

export default {
  name: "App",
  data() {
    return {
      phone: null,
      defaultCountryCode: "sv",
      locales: [
        {
          code: "es",
          name: "Español"
        },
        {
          code: "en",
          name: "English"
        }
      ],
      locale: "es",
      inputClass:
        "border py-2 text-lg pl-3 rounded focus:bg-gray-200 focus:font-bold focus:outline-none",
      selectorClass:
        "border py-2 text-lg pl-3 rounded focus:bg-gray-200 focus:font-bold focus:outline-none",
      noDialCode: false,
      noCountrySelector: false
    };
  },
  methods: {
    setPhoneNumber(value) {
      this.phone = value;
    }
  },
  computed: {
    countries() {
      const all = countries[this.locale];
      return Object.keys(all).map(code => {
        return {
          code: code,
          name: all[code]
        };
      });
    },
    phoneNumberExample() {
      if (this.phone) return this.phone.phoneNumberExample;
      return "-";
    },
    countryCode() {
      if (this.phone) return this.phone.countryCode;
      return "-";
    },
    countryCallingCode() {
      if (this.phone) return this.phone.countryCallingCode;
      return "-";
    },
    nationalNumber() {
      if (this.phone) return this.phone.nationalNumber;
      return "-";
    },
    internationalNumber() {
      if (this.phone) return this.phone.internationalNumber;
      return "-";
    },
    isValid() {
      if (this.phone) return this.phone.isValid;
      return false;
    }
  }
};
</script>

<style scoped>
tr > td {
  padding: 8px;
}
tr:nth-child(even) {
  @apply bg-blue-100;
}
</style>
