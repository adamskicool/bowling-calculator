import { shallowMount } from '@vue/test-utils';
import FrameFinal from '../../src/components/ScoreCardComponents/FrameFinal.vue';

describe("Test that the FrameFinal components renders correctly", () => {

    test("strike, strike, strike", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 10,
                secondShot: 10,
                thirdShot: 10,
                points: 30
            }
        })

        expect(wrapper.find('#first-shot').text()).toEqual('X');
        expect(wrapper.find('#second-shot').text()).toEqual('X');
        expect(wrapper.find('#third-shot').text()).toEqual('X');
    })
    test("strike, spare", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 10,
                secondShot: 5,
                thirdShot: 5,
                points: 20
            }
        })

        expect(wrapper.find('#first-shot').text()).toEqual('X');
        expect(wrapper.find('#second-shot').text()).toEqual('5');
        expect(wrapper.find('#third-shot').text()).toEqual('/');
    })
    test("spare, strike", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 5,
                secondShot: 5,
                thirdShot: 10,
                points: 20
            }
        })

        expect(wrapper.find('#first-shot').text()).toEqual('5');
        expect(wrapper.find('#second-shot').text()).toEqual('/');
        expect(wrapper.find('#third-shot').text()).toEqual('X');
    })
    test("spare, (0 - 9)", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 5,
                secondShot: 5,
                thirdShot: 1,
                points: 30
            }
        })

        expect(wrapper.find('#first-shot').text()).toEqual('5');
        expect(wrapper.find('#second-shot').text()).toEqual('/');
        expect(wrapper.find('#third-shot').text()).toEqual('1');
    })

    test("strike, two strikes that dont equal a spare or strike ", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 10,
                secondShot: 1,
                thirdShot: 1,
                points: 12
            }
        })

        expect(wrapper.find('#first-shot').text()).toEqual('X');
        expect(wrapper.find('#second-shot').text()).toEqual('1');
        expect(wrapper.find('#third-shot').text()).toEqual('1');
    })

    test("frame number and points renders correctly", () => {
        let wrapper = shallowMount(FrameFinal, {
            propsData: {
                frameNumber: 10,
                firstShot: 10,
                secondShot: 1,
                thirdShot: 1,
                points: 12
            }
        })

        expect(wrapper.find('#frame-number').text()).toEqual('10');
        expect(wrapper.find('#points').text()).toEqual('12');
    })
})