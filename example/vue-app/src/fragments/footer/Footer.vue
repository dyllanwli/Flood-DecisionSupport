<template>
  <v-footer dark
  :style="{'margin-top': $vuetify.breakpoint.smAndDown ? '-' + $store.getters.footerMiniHeight + 'px': '-' + $store.getters.footerFullHeight + 'px'}"
  :height="$vuetify.breakpoint.smAndDown? $store.getters.footerMiniHeight : $store.getters.footerFullHeight" :class="{'small': $vuetify.breakpoint.smAndDown}">
      <p>
        <span>&nbsp;© {{currentYear}} <strong>{{footerMainSiteName}}</strong></span>
        <span>&nbsp;<strong>
          <a class="hidden-sm-and-down" target="_blank" href="www.cidigis.com">{{"| TAMU CIDI Lab"}}</a>
          
          </strong></span>
        <span class="hidden-sm-and-down"> | {{$t('global.apiProviderIntro') }}
            <a class="hidden-sm-and-down" target="_blank" :href="footerLink">{{ $t('global.apiProvider') }}</a>
        </span>
      </p>
    </v-footer>
</template>

<script src="./footer.js">

</script>

<style src="./footer.css" scoped></style>


