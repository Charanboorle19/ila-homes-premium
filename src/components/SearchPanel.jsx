import { PROPERTY_TYPES } from "../data/content";
import { MicrophoneIcon, SearchIcon, TypeIcon } from "./icons";

export default function SearchPanel({
  query,
  onQueryChange,
  activeType,
  onSelectType,
  onSubmit,
  onVoice,
  listening,
  placeholder,
  placeholderFade,
  inputRef,
  onFocus,
  onBlur,
}) {
  return (
    <form className="search-shell" id="search-form" role="search" onSubmit={onSubmit}>
      <div className="search-row">
        <span className="ai-mark" aria-hidden="true">
          ✧
        </span>
        <div className="search-field">
          <label className="visually-hidden" htmlFor="property-query">
            Describe the property you are looking for
          </label>
          <input
            id="property-query"
            name="q"
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            className={placeholderFade ? "placeholder-fade" : undefined}
            aria-describedby="search-hint"
            value={query}
            ref={inputRef}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span className="search-hint" id="search-hint">
            e.g. Villa plots near ORR with good connectivity
          </span>
        </div>
        <span className="search-divider" aria-hidden="true"></span>
        <button
          className={listening ? "voice-button is-listening" : "voice-button"}
          type="button"
          aria-label="Voice search"
          title="Voice search"
          onClick={onVoice}
        >
          <MicrophoneIcon />
        </button>
        <button className="search-button" type="submit" aria-label="Search properties">
          <SearchIcon />
          <span>Search</span>
        </button>
      </div>
      <div className="search-divider-horizontal" aria-hidden="true"></div>
      <div className="property-types" role="group" aria-label="Choose property type">
        {PROPERTY_TYPES.map((type) => {
          const isActive = type === activeType;
          return (
            <button
              key={type}
              className={isActive ? "type-option is-active" : "type-option"}
              type="button"
              data-type={type}
              aria-pressed={isActive}
              onClick={() => onSelectType(type)}
            >
              <TypeIcon type={type} />
              <span>{type}</span>
            </button>
          );
        })}
      </div>
    </form>
  );
}
