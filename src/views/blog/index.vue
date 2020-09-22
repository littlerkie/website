<template>
  <div id="app">
    <main>
      <section class="blog__lastest" v-if="latestBlog.length">
        <div class="wrapper">
          <h1>Latest Blog</h1>
          <ul
            class="blog__item-list list--unstyled d--flex flex--column sm:flex--row sm:flex--wrap"
          >
            <li
              class="blog__item"
              v-for="(blog, index) in latestBlog"
              :key="blog.id"
              :class="
                index === 0
                  ? 'item--landscape'
                  : index > 2
                  ? 'item--portrait-1/3'
                  : ''
              "
            >
              <BlogTileView
                :blog="blog"
                :aspectRatio="
                  index === 0 ? 'padding-bottom: 25%' : 'padding-bottom: 75%'
                "
                :layoutDirection="index === 0 ? direction.horizontal : direction.vertical"
              />
            </li>
          </ul>
        </div>
      </section>
      <section class="blog__featured" v-if="featuredBlog.length">
        <h1>Featured Blog</h1>
      </section>
      <section class="blog__more--trunked" v-if="trunkedBlog.length">
        <div class="wrapper">
          <h1>More Blog</h1>
          <ul
            class="blog__item-list list--unstyled d--flex flex--column sm:flex--row flex--wrap"
          >
            <li class="blog__item" v-for="blog in trunkedBlog" :key="blog.id">
              <BlogTileView
                :blog="blog"
                :landscape="1"
                :aspectRatio="'padding-bottom: 25%'"
              />
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BlogTileView from "~/components/blog-tile.vue";
import { Blog } from "~/models/blog";
import { LayoutDirection } from "~/models/layout-direction";

@Component({
  components: {
    BlogTileView,
  },
})
export default class BlogListView extends Vue {

  private get direction() {
    return LayoutDirection;
  }

  get latestBlog(): Array<Blog> {
    return [
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
    ];
  }

  get featuredBlog(): Array<Blog> {
    return [new Blog(), new Blog(), new Blog(), new Blog()];
  }

  get trunkedBlog(): Array<Blog> {
    return [
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
      new Blog(),
    ];
  }
}
</script>

<style lang="scss">
.blog__lastest {
  background-color: var(--white);
}

.blog__item-list {
  $blog__item-padding: 2rem;
  margin-right: -$blog__item-padding;

  .blog__item {
    display: flex;
    margin-right: $blog__item-padding;
    margin-bottom: $blog__item-padding;
    flex-basis: calc(50% - #{$blog__item-padding});

    &.item--landscape {
      flex-basis: 100%;
    }

    &.item--portrait-1\/3 {
      flex-direction: column;
      flex-basis: calc(100% / 3 - #{$blog__item-padding});
    }
  }
}
</style>