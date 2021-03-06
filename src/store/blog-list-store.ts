import { Context } from "@nuxt/types";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Loadable } from "../utils/loadable";
import { Blog, BlogGroup } from "~/models/blog";

@Module({ name: "blog-list-store", stateFactory: true, namespaced: true })
export default class BlogListStore extends VuexModule implements Loadable {
  // MARK: Properties
  isLoading: boolean = false;
  latestBlog: Array<Blog> = [];
  featuredBlog: Array<Blog> = [];
  trunkedBlog: Array<Blog> = [];

  // MARK: Mutations
  @Mutation
  setLoadingState(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Mutation
  setLatestBlog(list?: Array<Blog>) {
    this.latestBlog = list ?? [];
  }

  @Mutation
  setFeaturedBlog(list?: Array<Blog>) {
    this.featuredBlog = list ?? [];
  }

  @Mutation
  setTrunkedBlog(list?: Array<Blog>) {
    this.trunkedBlog = list ?? [];
  }

  // MARK: Actions
  @Action({ rawError: true })
  async onLoading(context: Context): Promise<void> {
    this.setLoadingState(true);
    try {
      const blogGroup: BlogGroup = await context.app.$http.$get(
        `users/${context.$config.uid}/blog`
      );
      this.setLatestBlog(blogGroup.latestBlog);
      this.setFeaturedBlog(blogGroup.featuredBlog);
      this.setTrunkedBlog(blogGroup.trunkedBlog);
      this.setLoadingState(false);
    } catch (error) {
      this.setLoadingState(false);
      throw error;
    }
  }
}
