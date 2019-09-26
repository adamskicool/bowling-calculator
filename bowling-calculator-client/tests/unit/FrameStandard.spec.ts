import { shallowMount } from '@vue/test-utils';
import FrameStandard from '../../src/components/ScoreCardComponents/FrameStandard.vue';

/**
 * Test that the FrameStandard component renders correctly, for example passing props that make up a strike should render an 'X'
 * where as two strikes that make up a spare should render the first roll as a number followed by a '/'
 */
describe("Test that the FrameStandard components renders correctly", () => {
    test("two rolls that does not equal a strika or a spare", () => {
        let wrapper = shallowMount(FrameStandard, {
            propsData: {
                frameNumber: 1,
                firstShot: 1,
                secondShot: 1,
                points: 2
            }
        });
        expect(wrapper.find('#first-shot').text()).toEqual('1');
        expect(wrapper.find('#second-shot').text()).toEqual('1');
    })

    test("two rolls that equal a spare", () => {
        let wrapper = shallowMount(FrameStandard, {
            propsData: {
                frameNumber: 1,
                firstShot: 5,
                secondShot: 5,
                points: 10
            }
        });
        expect(wrapper.find('#first-shot').text()).toEqual('5');
        expect(wrapper.find('#second-shot').text()).toEqual('/');
    })

    test("two rolls that equal a strike", () => {
        let wrapper = shallowMount(FrameStandard, {
            propsData: {
                frameNumber: 1,
                firstShot: 10,
                secondShot: 0,
                points: 10
            }
        });
        expect(wrapper.find('#first-shot').text()).toEqual('');
        expect(wrapper.find('#second-shot').text()).toEqual('X');
    })

    test("points and framnumber are beeing rendered", () => {
        let wrapper = shallowMount(FrameStandard, {
            propsData: {
                frameNumber: 1,
                firstShot: 10,
                secondShot: 0,
                points: 10
            }
        });
        expect(wrapper.find("#points").text()).toEqual('10');
        expect(wrapper.find("#frame-number").text()).toEqual('1');
    })
})