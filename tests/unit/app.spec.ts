import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('Render correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: ['router-link', 'router-view'],
      },
    });

    console.log(wrapper.html());
  });
});
