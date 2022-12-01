import * as React from 'react';

const FindNearby = () => {

    return(
        <>
            <h1>Nearby Hospitals and Pharmacies</h1>
            <div id="map">
                <iframe
                    width={"750"}
                    height={"600"}
                    referrerPolicy={"no-referrer-when-downgrade"}
                    src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyA3kQYIczczwjOjlcER5He9LuQRmNOe0zQ&&q=hospital+pharmacy+near+me&zoom=15"}
                    allowFullScreen={""}>
                </iframe>
            </div>
        </>
    );
}
export default FindNearby;