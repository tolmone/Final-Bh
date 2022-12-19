function Hero() {

    return (

        <section className="hero vh-100 d-flex align-items-center" id="home">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mx-auto text-center">
                        <h1 className="display-4 text-white">Help Us Make A Difference</h1>
                        <p className="text-white my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque quia
                            sequi eius. Quas, totam aliquid. Repudiandae reiciendis vel excepturi ipsa voluptate dicta!
                        </p>
                        <a href="/donate" className="btn me-2 btn-primary">Donate now</a>
                        <a href="/products" className="btn btn-outline-light">Shop now</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;