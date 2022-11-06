import { reactive, ref } from 'vue';

const brushed = reactive({
  value: new Set(),
  cursor: null,
});
let uuid = 0;

export default () => {
  const doResetBrush = () => {
    brushed.value.clear();
  };

  const doUpdateBrush = (target) => {
    brushed.value = target;
  };

  const doSetCursor = (who) => {
    brushed.cursor = who;
  };

  uuid += 1;
  const uid = uuid;

  return {
    brushed,
    uid,
    doResetBrush,
    doUpdateBrush,
    doSetCursor,
  };
};
