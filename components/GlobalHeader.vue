<template>
  <div class="global-header" :class="{ 'is-sticky': isSticky }">
    <!-- Main Nav -->
    <div class="main-nav" role="navigation" aria-label="main navigation">
      <div class="main-nav-left">
        <main-nav-burger />
      </div>

      <div class="main-nav-brand">
        <nuxt-link to="/">
          <img :src="logoSrc" width="112" :alt="name" />
        </nuxt-link>
      </div>

      <div class="main-nav-right">
        <div class="main-nav-menu">
          <nuxt-link
            v-for="(link, index) in mainMenu"
            :key="index"
            :to="link.to"
            exact-active-class="is-active"
            class="main-nav-item"
            @click.native="disableMenu"
          >{{ link.title }}</nuxt-link>
        </div>
        <main-nav-cart />
      </div>
    </div>

    <!-- Mobile Nav -->
    <transition name="slide">
      <div class="nav-flyout" v-if="menuVisible">
        <div class="nav-flyout-header">
          <router-link class="navbar-item" to="/">
            <img :src="logoSrc" width="112" :alt="name" />
          </router-link>
          <button class="nav-flyout-close" @click="toggleShowMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              class="icon"
              role="img"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
              />
            </svg>
            <span class="is-sr-only">Close</span>
          </button>
        </div>
        <div class="nav-flyout-body">
          <slot name="flyout-menu">
            <nuxt-link
              v-for="(link, index) in mobileMenu"
              :key="index"
              :to="link.to"
              active-class="is-active"
              class="main-nav-item"
              @click.native="disableMenu"
            >{{ link.title }}</nuxt-link>
          </slot>
        </div>
      </div>
    </transition>

    <!-- Cart Flyout -->
    <cart />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Cart from '~/components/Cart'
export default {
  components: { Cart },
  props: {
    isSticky: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('space', ['id', 'name', 'linklists']),
    ...mapState('menu', ['menuVisible']),
    logoSrc() {
      if (this.id) {
        return `https://nacelle-assets.s3-us-west-2.amazonaws.com/space/${this.id}/logo.png`
      }

      return ''
    },
    mainMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(
          linklist => linklist.handle === 'main-menu'
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    },
    mobileMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(
          linklist => linklist.handle === 'mobile-menu'
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    }
  },
  methods: {
    ...mapMutations('menu', ['disableMenu', 'toggleShowMenu'])
  }
}
</script>

<style lang="scss">
.global-header.is-sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom: 1px solid #d3d3d3;
}

.main-nav-left,
.main-nav-right {
  display: flex;
  align-items: center;
}

.main-nav-left {
  justify-content: flex-start;

  @media only screen and (min-width: 769px) {
    display: none;
  }
}

.main-nav-right {
  justify-content: flex-end;
  flex-grow: 1;

  @media screen and (max-width: 786px) {
    flex-grow: unset;
  }
}

.main-nav-brand {
  @media screen and (max-width: 786px) {
    margin-left: -1rem;
  }
}

.main-nav-menu {
  display: flex;
  flex-grow: 1;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
}

button.main-nav-cart {
  // width: 112px;
  text-align: right;
}

.main-nav-item {
  padding: 1rem;
}

.main-nav-brand {
  img {
    display: block;
  }
}

.nav-flyout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 28rem;
  background-color: #ffffff;
  border-left: 1px solid #dedede7a;
  box-shadow: 20px 0px 20px 20px #e6e6e6c4;
  z-index: 999;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.32s ease;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-28rem);
}

.nav-flyout-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-bottom: 1px solid #d3d3d3;
}

.nav-flyout-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.nav-flyout-body {
  flex-grow: 1;
  padding: 1rem;
  overflow: scroll;
}
</style>
