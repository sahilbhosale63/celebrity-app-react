export default function DropDown(props: any) {
  const { gender, handleGender } = props;

  return (
    <select
      className="input-field"
      name="gender"
      value={gender}
      onChange={handleGender}
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="transgender">Transgender</option>
      <option value="rather-not-say">Rather not say</option>
      <option value="other">Other</option>
    </select>
  );
}
