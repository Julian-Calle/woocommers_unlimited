import Icon from "./Icon";

export default function ButtonIcon({ icon, cls, action }) {
  const actionButton = () => {
    if (action !== undefined) {
      action();
    }
  };

  return (
    <button onClick={actionButton} className={`btn_${cls}`}>
      <Icon icon={icon} cls />
    </button>
  );
}
