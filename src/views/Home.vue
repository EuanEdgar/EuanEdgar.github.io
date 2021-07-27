<template>
  <div>
    <h1>Projects</h1>
    <ul>
      <li
        v-for="site in sites"
        :key="site.name"
      >
        <router-link
          :to="site.location"
        >
          {{ site.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      sites: [
        {
          name: 'Blog',
          location: {
            name: 'Blog-Home',
          },
        },
      ],
    };
  },
};
</script>
