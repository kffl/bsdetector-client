import { shallowMount, createLocalVue } from '@vue/test-utils';
import TheKnowledgeBase from '../../src/views/TheKnowledgeBase.vue';

const localVue = createLocalVue();

jest.mock('../../src/axios');

const mountPage = (slug) => {
	const options = {
		localVue,
		mocks: {
			$route: {
				path: `/knowledge-base${slug ? '/' + slug : ''}`,
				params: {},
			},
		},
	};
	if (slug) {
		options.mocks.$route.params.slug = slug;
	}
	return shallowMount(TheKnowledgeBase, options);
};

describe('Knowledge Base component', () => {
	it('sets the correct default data', () => {
		expect(typeof TheKnowledgeBase.data).toBe('function');
		const defaultData = TheKnowledgeBase.data();
		expect(defaultData.error).toBe(null);
		expect(defaultData.content).toBe(null);
	});

	it('renders the main page', () => {
		const mainPage = mountPage();
		expect(mainPage.contains('h1')).toBe(true);
		expect(mainPage.text()).toContain('Here you can');
	});

	it('fetches markdown', async () => {
		const articlePage = mountPage('line-too-long');
		await articlePage.vm.$nextTick();
		expect(articlePage.vm.error).toBe(null);
		expect(articlePage.vm.content).toContain('# sample title');
	});

	it('displays an error page if an article does not exist', async () => {
		const errorPage = mountPage('foo');
		await errorPage.vm.$nextTick();
		expect(errorPage.vm.error).toBe(true);
		expect(errorPage.vm.loading).toBe(false);
		expect(errorPage.text()).toContain('404');
	});
});
