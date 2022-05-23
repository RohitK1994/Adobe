import React, { useEffect, useState } from "react";

export default function Cards() {

    const [user, setUser] = useState([]);
    const [search, setSearch] = useState('adobe');

    useEffect(() => {

        const val = localStorage.getItem('SearchVal');
        setSearch(val);
        const url = `https://aravindtwitter.herokuapp.com/twittersearch?key=${search}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setUser(json.statuses)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        setInterval(() => {
            setUser([]); fetchData();
        }, 30000);

    }, [search]);



    let textInput = React.createRef();

    let onOnclickHandler = (e) => {
        console.log(textInput.current.value);
        setSearch(textInput.current.value);

        localStorage.setItem('SearchVal', textInput.current.value);
    };

    return (
        <>

            {/* Search section start from here */}

            <div className="input-group mb-3 w-75 m-auto">
                <input className="form-control" ref={textInput} type="text" placeholder="Search...." />
                <button className="btn btn-info text-white text-uppercase" title="Search" onClick={onOnclickHandler}>Search</button>
            </div>

            {/* Search section end */}

            {/* Card section start from here */}

            <div className="row">
                {
                    user.map((currElem, key) => {
                        const { profile_image_url_https, name, screen_name, created_at } = currElem.user;

                        return (
                            <div className="col-12 col-md-6 col-lg-12" key={currElem.id_str}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-inner">
                                            <div className="card-image">
                                                <img src={profile_image_url_https} alt={screen_name} />
                                            </div>
                                            <div className="card-info">
                                                <ul className="top-section">
                                                    <li>{name}</li>
                                                    <li>{screen_name}</li>
                                                    <li>{created_at}</li>
                                                </ul>
                                                <h3 className="card-text">{currElem.text}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {/* Card section end */}
        </>
    )
}
