const SelectTheme = () => {
    return (
      <section>
        <p className={styles.title}>Theme</p>
        <input type="radio" name="theme1">
          <div>테마 내용</div>
          <div>기본</div>
        </input>
        <input type="radio" name="theme2">
          <div>테마 내용</div>
          <div>따뜻한</div>
        </input>
        <input type="radio" name="theme3">
          <div>테마 내용</div>
          <div>차가운</div>
        </input>
        <input type="radio" name="theme4">
          <div>테마 내용</div>
          <div>현란한</div>
        </input>
        
        <div>
            <button type="submit">적용하기</button>
        </div>
      </section>
    );
}

export default SelectTheme;